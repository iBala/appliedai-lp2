import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const webinarsDirectory = path.join(process.cwd(), 'content/webinars')

export interface Webinar {
  slug: string
  title: string
  description: string
  content: string
  date: string
  order?: number
}

export async function getAllWebinars(): Promise<Webinar[]> {
  try {
    const fileNames = await fs.readdir(webinarsDirectory)
    
    const webinars = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          const fullPath = path.join(webinarsDirectory, fileName)
          const fileContents = await fs.readFile(fullPath, 'utf8')
          const { data, content } = matter(fileContents)
          
          return {
            slug: fileName.replace(/\.mdx$/, ''),
            title: data.title,
            description: data.description,
            content,
            date: data.date,
            order: data.order || Infinity
          }
        })
    )
    
    return webinars.sort((a, b) => {
      if (a.order !== b.order) {
        return (a.order || Infinity) - (b.order || Infinity)
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('Error reading webinars:', error)
    return []
  }
} 