import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import Alpine, { type AlpineComponent } from 'alpinejs';

import { Jury, type AlpineStore } from './types';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

Alpine.store('global', {
  cursor: undefined,
  hovering: false,
  darkTheme: false,
  scrollProgress: 0,

  init() {
    lenis.on('scroll', (e) => {
      this.scrollProgress = e.progress * 100;
    });

    Alpine.effect(() => {
      if (this.cursor) document.body.classList.add('hide-cursor');
      else document.body.classList.remove('hide-cursor');
    });

    const buttons = document.querySelectorAll('button');
    const anchors = document.querySelectorAll('a');

    [...buttons, ...anchors].forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.hovering = true;
      });
      el.addEventListener('mouseleave', () => {
        this.hovering = false;
      });
    });
  },

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    document.body.classList.toggle('dark');
  },

  toggleCursor() {
    if (window.innerWidth < 1024) return;

    const cursors = Object.values(Jury);
    if (!this.cursor) {
      this.cursor = cursors[0];
      return;
    }

    const currentIndex = cursors.indexOf(this.cursor);
    this.cursor = cursors[currentIndex + 1] ?? cursors[0];
  },
} as AlpineComponent<AlpineStore>);
