import React, {useState} from 'react'
import {Icon} from '@iconify/react'
import heartIcon from '@iconify/icons-mdi/heart'
import starIcon from '@iconify/icons-mdi/star'
import homeIcon from '@iconify/icons-mdi/home'

const IconPicker = React.forwardRef((props, ref) => {
  const {type, value, onChange} = props
  const [searchTerm, setSearchTerm] = useState('')

  const icons = [
    {name: 'heart', icon: heartIcon},
    {name: 'star', icon: starIcon},
    {name: 'home', icon: homeIcon},
    // Add more icons here or dynamically load from Iconify
  ]

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleIconSelect = (icon) => {
    onChange({
      type: 'change',
      path: [],
      value: icon.icon,
    })
  }

  return (
    <div>
      <h3>{type.title}</h3>
      <p>{type.description}</p>
      <input
        type="text"
        placeholder="Search icons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{marginBottom: '1rem'}}
      />
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {filteredIcons.map((icon, index) => (
          <div
            key={index}
            style={{
              margin: '0.5rem',
              cursor: 'pointer',
              border: value === icon.icon ? '2px solid blue' : '2px solid transparent',
            }}
            onClick={() => handleIconSelect(icon)}
          >
            <Icon icon={icon.icon} width="24" height="24" />
          </div>
        ))}
      </div>
    </div>
  )
})

export default IconPicker
