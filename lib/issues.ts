import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const issuesDirectory = path.join(process.cwd(), 'content/common-issues')

export interface Issue {
  slug: string
  title: string
  description: string
  content: string
  date: string
  order?: number
}

export async function getAllIssues(): Promise<Issue[]> {
  try {
    const fileNames = await fs.readdir(issuesDirectory)
    
    const issues = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          const fullPath = path.join(issuesDirectory, fileName)
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
    
    return issues.sort((a, b) => {
      if (a.order !== b.order) {
        return (a.order || Infinity) - (b.order || Infinity)
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('Error reading issues:', error)
    return []
  }
} 