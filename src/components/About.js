import React from 'react';
import './About.css';

const About = () => (


  <div className="site-page about-page">
    <h1>About</h1>

    <p>
        Hello, I'm John, the man behind Framing Norah, proudly serving the west end of Glasgow and surrounding areas. <br />With over three decades of experience in picture framing, I've encountered every framing challenge you can imagine.
    </p>
    <p>
        At Framing Norah, my goal is to help you beautify your home. Whether it’s a cherished family portrait, a stunning piece of artwork, or a quirky poster, I have the skills and expertise to ensure they are securely and beautifully displayed, just where you want them.
<img src={process.env.PUBLIC_URL + '/Glasgow_Norah.jpg'} alt="Framing Norah" loading="lazy" />

<br />I take pride in using only the best hanging materials and equipment. You can trust that with Framing Norah, your art will stay up straight and secur - no more worrying about crooked frames or flimsy hooks. Quality and durability are my top priorities.
</p>
<p>
Do you have DIY framing project that didn’t go as planned? Don’t worry. I specialize in fixing "off the shelf" mounts and frames that don’t work. I’ll bring my know - how to sort them out.
</p>

<p>For your peace of mind, Framing Norah is fully insured, and I offer a satisfaction guarantee on all work performed. If you’re not completely happy with the result, I’ll make it right.
</p>
<p>
If you’re tired of struggling with your frames or want to ensure your artwork is hung with care and precision, look no further than Framing Norah. I provide personalized service tailored to your needs, right at your doorstep. Let’s transform your walls into a gallery-worthy masterpiece, one frame at a time!
</p>

 <img src={process.env.PUBLIC_URL + '/Glasgow_Picture_Hanger.jpeg'} alt="Framing Norah" loading="lazy" />
  </div>

);

export default About;
