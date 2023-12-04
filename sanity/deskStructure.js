// deskStructure.js
import S from '@sanity/desk-tool/structure-builder'
import Logo from './logo.svg' // Adjust the path to your actual logo

export default () =>
  S.list()
    .title('BUBU')
    .items([
      S.documentTypeList('yourDocumentType')
        .title('Your Document Type')
        .icon(() => <img src={Logo} alt="Logo" style={{width: '24px'}} />)
        .items([
          // Add other items for your document type
        ]),
      // Add your other desk items as needed
    ])
    .showIcons(true)
