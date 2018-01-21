import React from 'react'

export default function SideBanners ({banners, showBanners}) {
  if(!showBanners || banners.length <= 0) {
    return null
  }
  console.log(banners)
  return (
    <div>
    {
      banners.map((item) => (
        <a key={item._id} href={ item.link } target={ item.target } >
          <img alt="" key={item.id} src={ item.src } style={ { marginBottom:'10px', width:'100%'} } /> 
        </a>
      ))
    }
    </div>
  )
}