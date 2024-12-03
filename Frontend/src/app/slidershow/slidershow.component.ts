import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slidershow',
  templateUrl: './slidershow.component.html',
  styleUrls: ['./slidershow.component.css']
})
export class SlidershowComponent implements OnInit, OnDestroy {
  images = [
    { src: '../../assets/images/pob.jpg'},
    { src: '../../assets/images/horizontal_image.png'},
    { src: '../../assets/images/rec.jpg', alt: 'Image 3' },
    { src: '../../assets/images/trash.jpg', alt: 'Image 4' },
    { src: '../../assets/images/product.jpg', alt: 'Image 5' },
    { src: '../../assets/images/product1.jpg', alt: 'Image 6' },
  ];
  currentIndex = 0;  // To track the current image
  autoSlideInterval: any;  // To store the interval timer

  ngOnInit() {
    this.startAutoSlide();  // Start the auto-slide when component is initialized
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);  // Cleanup the interval when the component is destroyed
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);  // Change the slide every 4 seconds
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;  // Loop back to the first image when at the last image
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;  // Loop back to the last image when at the first image
  }

  setSlide(index: number) {
    this.currentIndex = index;  // Set the slide to a specific index when a user clicks on an indicator
  }
}
