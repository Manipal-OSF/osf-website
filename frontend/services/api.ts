import { serverUrl } from '../constants';

type PostStatus = 'published' | 'draft';

interface ImageSize {
  url: string;
  width: number;
  height: number;
  mimeType: string;
}

export interface Image {
  title: string;
  alt: string;
  width: number;
  height: number;
  mimeType: string;
  url: string;
  sizes: ImageSize[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  publishDate: string;
  authors: string[];
  coverImage: Image;
  category: string;
  tags: Tag[];
  estimatedTime: number;
}

// FIXME: Convert to payload config

export const getUidList = async (): Promise<Array<any>> => {
  const res = await fetch(`${serverUrl}/api/posts?populate=*`);
  const json = (await res.json())['docs'];
  const uids = json.map((e: any) => {
    return { params: { id: e.id } };
  });

  return uids;
};

export const fetchOne = async (uid: string): Promise<BlogPost> => {
  const res = await fetch(
    `${serverUrl}/api/posts/${uid}?populate=*`
  );
  console.log(`${serverUrl}/api/posts/${uid}?populate=*`);
  const json = await res.json();
  const data = json;

  const imageData = data.coverImage;
  const category = data.category;
  console.log(data)
  const tags = data.tags.map((item: any) => {
    const tag: Tag = {
      id: item.id,
      name: item.name,
    };
    return tag;
  });
  const thumbnailSize: ImageSize = {
    width: imageData.sizes.thumbnail.width,
    height: imageData.sizes.thumbnail.height,
    mimeType: imageData.sizes.thumbnail.ext,
    url: imageData.sizes.thumbnail.url,
  };

  const tabletSize: ImageSize = {
    width: imageData.sizes.tablet.width,
    height: imageData.sizes.tablet.height,
    mimeType: imageData.sizes.tablet.ext,
    url: imageData.sizes.tablet.url,
  };

  const coverImage: Image = {
    title: imageData.title,
    alt: imageData.alt,
    width: imageData.width,
    height: imageData.height,
    mimeType: imageData.mimeType,
    url: imageData.url,
    sizes: [thumbnailSize, tabletSize],
  };

  const post: BlogPost = {
    id: data.id,
    title: data.title,
    content: data.content,
    publishDate: data.publishedDate,
    authors: data.authors.name,
    coverImage: coverImage,
    category: category,
    tags: tags,
    estimatedTime: data.estimatedTime,
  };

  return post;
};

export const fetchData = async (): Promise<BlogPost[]> => {
  const res = await fetch(`${serverUrl}/api/posts?populate=*`);
  console.log(`${serverUrl}/api/posts?populate=*`);

  const json = await res.json();
  const data = json.docs;

  return data
    .filter((item: any) => item.status == 'published')
    .map((item: any) => {
      const imageData = item.coverImage;
      const category = item.category;
      const tags = item.tags.map((item: any) => {
        const tag: Tag = {
          id: item.id,
          name: item.name,
        };
        return tag;
      });

      const thumbnailSize: ImageSize = {
        width: imageData.sizes.thumbnail.width,
        height: imageData.sizes.thumbnail.height,
        mimeType: imageData.sizes.thumbnail.mimeType,
        url: imageData.sizes.thumbnail.url,
      };

      const tabletSize: ImageSize = {
        width: imageData.sizes.tablet.width,
        height: imageData.sizes.tablet.height,
        mimeType: imageData.sizes.tablet.mimeType,
        url: imageData.sizes.tablet.url,
      };

      const coverImage: Image = {
        title: imageData.title,
        alt: imageData.alt,
        width: imageData.width,
        height: imageData.height,
        mimeType: imageData.mimeType,
        url: imageData.url,
        sizes: [thumbnailSize, tabletSize],
      };

      const post: BlogPost = {
        id: item.id,
        title: item.title,
        content: item.content,
        publishDate: item.publishedDate,
        authors: item.authors.name,
        coverImage: coverImage,
        category: category,
        tags: tags,
        estimatedTime: item.estimatedTime,
      };

      return post;
    });
};
