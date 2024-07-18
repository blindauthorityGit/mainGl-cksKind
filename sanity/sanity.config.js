import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {simplerColorInput} from 'sanity-plugin-simpler-color-input'
import IconPicker from './components/IconPicker' // Import the custom input component

import Logo from './static/logo.png'

export default defineConfig({
  name: 'default',
  title: 'MainGlücksKind',

  projectId: 'prz88za0',
  dataset: 'production',

  studio: {
    components: {
      logo: Logo.src,
    },
  },

  plugins: [
    deskTool(),
    visionTool(),
    simplerColorInput({
      // Note: These are both optional
      defaultEnableAlpha: true,
      defaultColorList: [
        {label: 'Schwangerschaft', value: '#C8C1E1'},
        {label: 'Baby & Kleinkind', value: '#F3E584'},
        {label: 'Workshop & Beratung', value: '#3E55AB'},
        {label: 'Custom...', value: 'custom'},
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
