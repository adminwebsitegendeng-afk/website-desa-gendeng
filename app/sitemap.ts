import { MetadataRoute } from 'next'
import { getWargaList, getWisataList, getPotensiList } from '@/lib/admin/services/adminService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://website-desa-gendeng.vercel.app'

  // Fetch dynamic content
  const [wargaList, wisataList, potensiList] = await Promise.all([
    getWargaList(),
    getWisataList(),
    getPotensiList(),
  ])

  // Map dynamic content to sitemap entries
  const wargaEntries: MetadataRoute.Sitemap = wargaList
    .filter(item => item.status === 'published')
    .map((item) => ({
      url: `${baseUrl}/warga-komunitas/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  const wisataEntries: MetadataRoute.Sitemap = wisataList
    .filter(item => item.status === 'published')
    .map((item) => ({
      url: `${baseUrl}/wisata-budaya/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  const potensiEntries: MetadataRoute.Sitemap = potensiList
    .filter(item => item.status === 'published')
    .map((item) => ({
      url: `${baseUrl}/potensi-ekonomi/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/profil-desa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/warga-komunitas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wisata-budaya`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/potensi-ekonomi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontak-lokasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...wargaEntries,
    ...wisataEntries,
    ...potensiEntries,
  ]
}
