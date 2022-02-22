import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Modal from "react-modal";

Modal.setAppElement("#root");

export const ExampleComponent = (props) => {

  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState(true);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
      
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; } 
    }));
  } catch(e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('touchmove', preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  const modalOpener = () => {
    setIsOpen(true);
    disableScroll();
    setTimeout(()=>{
      let ele;
      if(pos)
        ele = document.getElementsByClassName("ReactModal__Content--after-open")[0];
      else
        ele = document.getElementsByClassName("ReactModal__Content--after-open")[1];
        
      if(ele) ele = ele.lastChild;
      if(ele) ele = ele.scrollIntoView({block:"end"});
    },100);
    setTimeout(()=>{setIsOpen(false); enableScroll()},2000);
  }

  const cont = {
      top: '0',
      left: '0',
      right: 'auto',
      bottom: 'auto',
      marginRight: '0',
      width: '100%',
      height: '100vh',
      background: '#191919',
      padding: '0',
      border: 'none',
      overflow: 'hidden',
  }

  let post1 = count===0?false:true;
  let post2 = ((count+1)<props.redirections.length)?true:false;

  const showMore = () => {
    modalOpener();
    if(pos) {
      if(count>0) {
        document.getElementsByClassName('selector')[count-1].classList.toggle(styles.hidden);
        document.getElementsByClassName('selector')[count].classList.toggle(styles.hidden);
        setCount(count-1);
      }
      window.scrollTo({ top: document.body.scrollHeight, left: 0 });
    } else {
      if((count+1) < props.redirections.length) {
        document.getElementsByClassName('selector')[count].classList.toggle(styles.hidden);
        document.getElementsByClassName('selector')[count+1].classList.toggle(styles.hidden);
        setCount(count+1);
      }
      window.scrollTo({ top: 0, left: 0 });
    }
    
  }

  const Mode = () => {
    let count1 = 0;
    if(pos) {
      for(let i=0; i<count; i++)
        count1+=props.redirections[i].count;
      let arr = [];
      let arr2 = [];

      for(let i=0; i<props.redirections[count].viewport; i++) {
        arr.push(props.children[count1+i]);
        arr2.push(props.children[count1-2+i]);
      }

      return (
        <div>        
          <Modal isOpen={isOpen} style={{content: cont}}>
            {arr}
          </Modal>
          <Modal isOpen={isOpen} style={{content: {...cont, animation: 'scroll1 1s 1 .1s ease-out forwards'}}}>
            {arr2}
          </Modal>
        </div>
      );
    } else {
      for(let i=0; i<=count; i++)
        count1+=props.redirections[i].count;
      let arr = [];
      let arr2 = [];

      for(let i=0; i<props.redirections[count].viewport; i++) {
        arr.push(props.children[count1+i]);
        arr2.push(props.children[count1-2+i]);
      }

      return (
        <div>
          <Modal isOpen={isOpen} style={{content: cont}}>
            {arr2}
          </Modal>
          <Modal isOpen={isOpen} style={{content: {...cont, animation: 'scroll2 1s 1 .1s ease-out forwards'}}}>
            {arr}
          </Modal>
        </div>
      );
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', function() {
      if (post1 && (document.documentElement.scrollTop<250)) {
        setVisible(true)
        setPos(true)
      }
      else if (post2 && ((window.innerHeight + window.scrollY + 250) >= document.body.scrollHeight)) {
        setVisible(true)
        setPos(false)
      }
      else
        setVisible(false)
    })
    window.addEventListener('touchmove', function() {
      if (post1 && (document.documentElement.scrollTop<250)) {
        setVisible(true)
        setPos(true)
      }
      else if (post2 && ((window.innerHeight + window.scrollY + 250) >= document.body.scrollHeight)) {
        setVisible(true)
        setPos(false)
      }
      else
        setVisible(false)
    })
  })

  let x = 0;

  const stylesX = {
    ...props.styles,
    visibility: visible?"visible":"hidden",
    animation: "5s ease-out infinite bounce"
  }

  console.log(stylesX);


  return (
    <div>
      {props.hideScroll && <Mode />}
      {props.redirections.map((items,i)=>{
        let div = [];
        for(let j=x; j<items.count+x; j++) {
          div.push(props.children[j]);
        }
        x+=items.count;
        return <div key={i+x} className={"selector "+(i?styles.hidden:'')}>{div}</div>;
      })}
        <div
          className={styles.more +' '+ (pos?styles.up:styles.down)}
          onClick={showMore}
          style={stylesX}
        >
          {props.svg || (
            <svg
              stroke="currentColor"
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
            </svg>)
          }
        </div>
    </div>
  )
}