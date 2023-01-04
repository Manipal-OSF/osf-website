import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { serverUrl } from '../constants';
import type { BlogPost } from '../services/api';

interface BlogCardProps {
  data: BlogPost;
  index: number;
}

const BlogCard: FunctionComponent<BlogCardProps> = (props: BlogCardProps) => {
  return (
    <Link href={`/blog/${props.data.uid}`}>
      <a>
        <div className='border-2 dark:border-gray-500 card flex max-h-[20rem] cursor-pointer hover:-translate-y-1 duration-300'>
          <Image
            src={`https://osf-site-cms.herokuapp.com${props.data.coverImage.url}`}
            alt={props.data.coverImage.alt}
            height={props.data.coverImage.height}
            width={props.data.coverImage.width}
            layout='responsive'
            className='duration-300 hover:scale-110 max-h-[10rem]'
          ></Image>
          <div className='p-3 flex flex-col flex-grow-[1]'>
            <h2 className='text-2xl'>{props.data.title}</h2>
          </div>
          <div className='flex flex-row justify-between p-3'>
            <p>{props.data.authors}</p>
            <p>{props.data.publishDate}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogCard;
