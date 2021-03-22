import React,{useEffect} from 'react'
import "../App.css"
import useWebAnimations from "@wellyshen/use-web-animations";

export default function Redqueenrace() {
  var playbackRateRQ=1;
  var playbackRateBG=0


/* Background animations */
let sceneryFrames =   [
  { transform: 'translateX(100%)' },
  { transform: 'translateX(-100%)' }   
];

let sceneryTimingBackground = {
  duration: 36000,
  iterations: Infinity
};

let sceneryTimingForeground = {
  duration: 12000,
  iterations: Infinity
};


let background1Movement=useWebAnimations({
  keyframes:sceneryFrames,
  timing:sceneryTimingBackground
})
let background2Movement=useWebAnimations({
  keyframes:sceneryFrames,
  timing:sceneryTimingBackground
})
let foreground1Movement=useWebAnimations({
  keyframes:sceneryFrames,
  timing:sceneryTimingForeground
})
let foreground2Movement=useWebAnimations({
  keyframes:sceneryFrames,
  timing:sceneryTimingForeground
})

let spriteFrames = [
  { transform: 'translateY(0)' },
  { transform: 'translateY(-100%)' }   
];

let redQueen_alice_sprite=useWebAnimations({
  keyframes:spriteFrames,
  timing:{
    easing: 'steps(7, end)',
    direction: "reverse",
    duration: 600,
    playbackRate: 1,
    iterations: Infinity
  }
})

const adjustBackgroundPlayback = function() {
  if (playbackRateRQ < .8) {  
      playbackRateBG = playbackRateBG/2 * -1;   
  } else if (playbackRateRQ > 1.2) {
    playbackRateBG = playbackRateBG/2;
  } else {  
    playbackRateBG = 0;     
  }  
  foreground1Movement.getAnimation().playbackRate=playbackRateRQ;
  foreground2Movement.getAnimation().playbackRate=playbackRateRQ; 
  background1Movement.getAnimation().playbackRate=playbackRateRQ; 
  background2Movement.getAnimation().playbackRate=playbackRateRQ; 



}



useEffect(() => {

  background1Movement.getAnimation().currentTime =
  background1Movement.getAnimation().effect.getTiming().duration / 2;
  foreground1Movement.getAnimation().currentTime =
  foreground1Movement.getAnimation().effect.getTiming().duration / 2;

  document.addEventListener("click",()=>{
    // playbackRateRQ *= 1.1;
    playbackRateRQ = playbackRateRQ*1.1;
    redQueen_alice_sprite.getAnimation().playbackRate =playbackRateRQ;
    adjustBackgroundPlayback();
  })

  setInterval( function() {
    /* Set decay */
    if (playbackRateRQ> .4) {
      playbackRateRQ*= .9
      redQueen_alice_sprite.getAnimation().playbackRate = playbackRateRQ;    
    } 
    adjustBackgroundPlayback();
  }, 3000);
},[])






  return (
    <div>
      <div className="wrapper">
        <div className="sky"></div>
        <div className="earth">
          <div id="red-queen_and_alice" >
            <img id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
             srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" 
             alt="Alice and the Red Queen running to stay in place." 
             ref={redQueen_alice_sprite.ref}
             />
          </div>
        </div>

        <div className="scenery" id="foreground1" ref={foreground1Movement.ref}>
          <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
        </div>
        <div className="scenery" id="foreground2" ref={foreground2Movement.ref}>
          <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
          <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
        </div>
        <div className="scenery" id="background1" ref={background1Movement.ref}>
          <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
          <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
          <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
        </div>
        <div className="scenery" id="background2" ref={background2Movement.ref}>
          <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />

          <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
          <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
        </div>
      </div>
    </div>
  )
}

