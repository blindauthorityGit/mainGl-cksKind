// schemas/index.js

import section from './sections/index'
import event from './events'
import pekip from './events/pekip'

//PAGES
import home from './pages/home'
import raumvermietung from './pages/raumvermietung'
import kursInfo from './pages/kursInfo'
import kindergeburtstag from './pages/kindergeburtstag'
import ueberuns from './pages/about'
import cafe from './pages/cafe'
import anfahrt from './pages/anfahrt'

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
import basicText from './components/basicText'
import imageGallery from './components/imageGallery'
import roomDetails from './components/roomDetails'
import cardButtons from './components/cardButton'
import cardButtonCollection from './components/cardButtonCollection'
import menuItem from './components/menuItem'
import speiseKategorie from './components/speiseKategorie'
import datumField from './components/datumField'
import eventBlock from './components/block'
import recurringEvent from './components/recurringEvent'
import exceptions from './components/exceptions'
import product from './components/product'
import downloadBereich from './components/downloadBereich'

//SECTIONS
import partner from './sections/partner'
import location from './sections/location'
import kategorie from './sections/kategorie'
import kontakt from './sections/kontakt'
import speisekarte from './sections/speisekarte'
import modalGeneral from './sections/modalGeneral'

export const schemaTypes = [
  mainHero,
  basicHero,
  section,
  home,
  raumvermietung,
  kindergeburtstag,
  ueberuns,
  cafe,
  event,
  pekip,
  eventDetails,
  partner,
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
  basicText,
  kursInfo,
  imageGallery,
  roomDetails,
  cardButtons,
  cardButtonCollection,
  speisekarte,
  menuItem,
  speiseKategorie,
  datumField,
  eventBlock,
  recurringEvent,
  modalGeneral,
  exceptions,
  product,
  anfahrt,
  downloadBereich,
  // Add more schema types as needed
]
