import SimpleImageSlider from "react-simple-image-slider";
import ff14 from '../../assets/images/ff14.jpg'
import csgo from '../../assets/images/csgo.jpg'
import cod from '../../assets/images/cod.jpg'
import lol from '../../assets/images/lol.jpg'
import dota from '../../assets/images/dota.jpg'
import wow from '../../assets/images/wow.jpg'
import './ImageSlider.css';

const images = [
    { url: ff14 },
    { url: csgo },
    { url: cod },
    { url: lol },
    { url: dota },
    { url: wow },
];

const ImageSlider = () => {
    return (
        <div className='slider'>
          <SimpleImageSlider
            width={1024}
            height={504}
            images={images}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
          />
        </div>
      )
}

export default ImageSlider;
