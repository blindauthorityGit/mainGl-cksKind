// imageGallery.js
export default {
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare(value) {
      const imageCount = value.images ? value.images.length : 0
      return {
        title: `Image Gallery (${imageCount} ${imageCount === 1 ? 'image' : 'images'})`,
      }
    },
  },
}
