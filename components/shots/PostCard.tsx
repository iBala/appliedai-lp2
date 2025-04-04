import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface PostCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    publishedAt: string;
    readTimeMinutes?: number;
    thumbnail_url?: string;
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/shots/${post.id}`}>
      <Card className="h-full transition-all hover:shadow-lg border-gray-100">
        {post.thumbnail_url && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.thumbnail_url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
              {post.title}
            </h3>
            {post.readTimeMinutes && (
              <span className="text-sm text-gray-500">
                {post.readTimeMinutes} min read
              </span>
            )}
          </div>
          <time className="text-sm text-gray-500">
            {formatDate(post.publishedAt)}
          </time>
        </CardHeader>
        {post.subtitle && (
          <CardContent>
            <p className="line-clamp-2 text-sm text-gray-600">
              {post.subtitle}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
} 