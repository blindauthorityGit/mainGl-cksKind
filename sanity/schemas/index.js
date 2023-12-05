// schemas/index.js

import section from './sections/index'
import home from './pages/home'
import event from './events'
// COMPONENTS
import mainHero from './components/mainHero'
import basicHero from './components/basicHero'
import eventDetails from './components/eventDetails'
import button from './components/button'
import card from './components/card'
import cardCollection from './components/cardCollection'
import ctaText from './components/ctaText'
import textWithImage from './components/textWithImage'
import fullImageWidthText from './components/fullImageWidthText'
import eventslider from './components/eventSlider'
import seo from './components/seo'
//SECTIONS
import trainer from './sections/trainer'
import location from './sections/location'
import kategorie from './sections/kategorie'
import kontakt from './sections/kontakt'

export const schemaTypes = [
  mainHero,
  basicHero,
  section,
  home,
  event,
  eventDetails,
  trainer,
  location,
  kategorie,
  button,
  card,
  cardCollection,
  ctaText,
  textWithImage,
  fullImageWidthText,
  kontakt,
  eventslider,
  seo,
  // Add more schema types as needed
]
