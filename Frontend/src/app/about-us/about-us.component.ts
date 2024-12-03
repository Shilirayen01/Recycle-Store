import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  title = "We're changing the way people think";
  headerDescription = "A recognized leader in the field of recycling and waste management...";
  headerImages = [
    { src: 'assets/images/recyclage_bois.jpg', alt: 'Image 1' },
    { src: 'assets/images/recyclage_plastique.jpg', alt: 'Image 2' },
    { src: 'assets/images/recyclage_verre1.jpg ', alt: 'Image 3' }
  ];

  missionTitle = "Our mission";
  missionDescription = "We reduce the impact of waste by reintegrating it into the circular economy. Our goal is to create a world without waste.";
  missionImage = { src: '../../assets/mission_img.jpeg', alt: 'Mission Image' };

  valuesTitle = "Our values";
  values = [
    { title: 'Sustainability', description: 'Minimizing the carbon footprint for a positive impact on the environment.' },
    { title: 'Innovation', description: 'Investing in modern technologies to improve recycling.' },
    { title: 'Social Responsibility', description: 'Actively contributing to the community with ethical practices.' },
    { title: 'Collaboration', description: 'Working in partnership to achieve common goals.' }
  ];

  teamTitle = "Our team";
  teamDescription = "We're a dynamic group of individuals who are passionate about what we do.";
  team = [
    { name: 'Rayen Shili', position: 'Team Lead', photo: '../../assets/team/rayen_shili.jpg' },
    { name: 'Ahmed Rekik', position: 'Designer', photo: '../../assets/team/ahmed_rekik.jpg' },

  ];

  blogTitle = "From the blog";
  blogDescription = "Learn how to grow your business with our expert advice.";
  blogPosts = [
    { title: 'Post 1', excerpt: 'Short description of post 1', image: '../../assets/blog/post1.jpg' },
    { title: 'Post 2', excerpt: 'Short description of post 2', image: '../../assets/blog/post2.jpg' },

  ];
mission: any;
}

