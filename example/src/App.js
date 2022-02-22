import React from 'react'

import { ExampleComponent } from 'react-transition-noscroll'
import 'react-transition-noscroll/dist/index.css'

const App = () => {
  return (
    <ExampleComponent 
      hideScroll={true}
      redirections= {[
        {count: 3,viewport:2},
        {count: 3,viewport:2},
        {count: 3,viewport:2}]}
      styles={{
        right: "48%",
        borderRadius: "30%",
        backgroundColor: "white",
      }}
      svg={
        <svg
          stroke="red"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>}
    >
      {["red","blue","green","yellow","violet","pink","gold","crimson","black"].map((item,i)=>{
        return <div key={item} style={{background: item}}><img alt="random" src={"https://source.unsplash.com/random?sig="+i} /><span>{'Division '+parseInt(i/3)}</span></div>
      })}
    </ExampleComponent>
  )
}

export default App
