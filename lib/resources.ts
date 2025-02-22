import 'server-only';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const resourcesDirectory = path.join(process.cwd(), 'content/resources');

export interface Resource {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  order?: number;
}

export async function getAllResources(): Promise<Resource[]> {
  try {
    // Ensure directory exists
    try {
      await fs.access(resourcesDirectory);
    } catch {
      await fs.mkdir(resourcesDirectory, { recursive: true });
    }

    const fileNames = await fs.readdir(resourcesDirectory);
    
    const resources = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          const fullPath = path.join(resourcesDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          return {
            slug: fileName.replace(/\.mdx$/, ''),
            title: data.title,
            description: data.description,
            content,
            date: data.date,
            order: data.order || Infinity
          };
        })
    );
    
    return resources.sort((a, b) => {
      if (a.order !== b.order) {
        return (a.order || Infinity) - (b.order || Infinity);
      }
      return a.date > b.date ? -1 : 1;
    });
  } catch (error) {
    console.error('Error reading resources:', error);
    return [];
  }
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  try {
    const fullPath = path.join(resourcesDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title,
      description: data.description,
      content,
      date: data.date
    };
  } catch (e) {
    console.error('Error reading resource:', e);
    return null;
  }
} 