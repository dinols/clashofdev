/**
 * Initializes the main layout script.
 *
 * This script sets up various functionalities including smooth scrolling with Lenis,
 * scroll-triggered animations with GSAP, and state management with Alpine.js.
 *
 * Dependencies:
 * - Lenis: Smooth scrolling library.
 * - GSAP: Animation library.
 * - Alpine.js: Reactive state management library.
 *
 * Features:
 * - Registers GSAP plugins: ScrollTrigger and Draggable.
 * - Sets up Lenis for smooth scrolling and integrates it with GSAP's ticker.
 * - Initializes an Alpine.js store named 'global' with the following properties:
 *   - `cursor`: Manages the custom cursor state.
 *   - `hovering`: Tracks whether the mouse is hovering over interactive elements.
 *   - `darkTheme`: Toggles the dark theme.
 *   - `scrollProgress`: Tracks the scroll progress as a percentage.
 *
 * The `init` method of the Alpine store:
 * - Listens to Lenis scroll events to update `scrollProgress`.
 * - Reactively toggles the 'hide-cursor' class on the body based on the `cursor` state.
 * - Adds event listeners to buttons and anchor elements to update the `hovering` state.
 *
 * The `toggleTheme` method:
 * - Toggles the `darkTheme` state and updates the body's class list accordingly.
 *
 * The `toggleCursor` method:
 * - Cycles through custom cursor states defined in the `Jury` enum, if the window width is 1024px or greater.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import Alpine, { type AlpineComponent } from 'alpinejs';

import { Jury, type AlpineStore } from '#/libs/types';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const timelines: GSAPTimeline[] = [];

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

    const sections = document.querySelectorAll('[x-data="section"]');

    if (this.darkTheme) {
      sections.forEach((section, index) => {
        // Animate in
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 30%',
            scrub: 0.5,
          },
        });
        tl1
          .from(section, {
            scale: 0.85,
            rotate: 10,
            y: index === 0 ? 100 : 0,
          })
          .to(section, {
            scale: 1,
            rotate: 0,
            y: 0,
          });

        // Animate out
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 0%',
            end: 'top -80%',
            scrub: 0.5,
          },
        });
        tl2.to(section, {
          scale: 0.85,
          rotate: -10,
        });

        timelines.push(tl1, tl2);
      });

      ScrollTrigger.refresh();
    } else {
      timelines.forEach((tl) => {
        sections.forEach((section) => {
          gsap.set(section, { clearProps: 'all' });
        });
        tl.kill();
      });
    }
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
