import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './apex/initRegion';

@customElement('slide-over')
class SlideOver extends LitElement {
  @property({ type: String, reflect: true })
  open = 'false';

  @property({ type: String })
  header = '';

  @property({ type: String })
  width = '500px';

  @property({ type: String })
  direction = 'right';

  initialized = false;

  that = this;

  static get styles() {
    return css`
      @media (prefers-reduced-motion: reduce) {
        * {
          transition: none !important;
        }
      }

      @media screen and (min-width: 1px) and (max-width: 480px) {
        .slide-over {
          width: 100% !important;
          background-color: red;
        }
      }

      .slide-open {
        --layover-opacity: 0.75;
        --translate: 0;
      }

      .slide-closed {
        --layover-opacity: 0;
      }

      .slide-closed .slide-over-r {
        --translate: 100%;
      }

      .slide-closed .slide-over-l {
        --translate: -100%;
      }

      .slide-closed .layover {
        opacity: 0;
      }

      .slide-open .layover {
        pointer-events: auto;
      }

      .layover {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(41, 41, 41, 0.6);
        z-index: 99998;
        opacity: 1;
        pointer-events: none;

        transition: opacity 150ms ease-in-out;
      }

      .slide-over {
        pointer-events: auto;
        position: fixed;
        top: 0;
        bottom: 0;
        background: var(--ut-body-background-color, #fff);
        z-index: 99999;
        height: 100%;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        transform: translateX(var(--translate));
        transition: transform 0.35s ease-in-out;
      }

      .slide-over-r {
        right: 0;
      }

      .slide-over-l {
        left: 0;
      }

      .slide-header {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .slide-header-text {
        margin: 0;
        color: var(--ut-body-title-text-color, #262626);
        font-size: 1.5rem;
        font-family: var(
          --ut-hero-region-title-font-family,
          ui-sans-serif,
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          'Helvetica Neue',
          Arial,
          sans-serif;
        );
        font-weight: var(600);
      }

      .close-button {
        display: flex;
        padding: 4px;
        border: none;
        background-color: transparent;
        color: var(--ut-body-text-color, #9ca3af);
        opacity: 0.5;
        border: 2px solid transparent;
        cursor: pointer;
        line-height: inherit;
        border-radius: 8px;
      }

      .close-button:hover {
        opacity: 1;
      }

      .close-button:focus {
        border-color: var(--ut-palette-primary, #9ca3af);
      }

      .slide-content {
        padding: 16px;
      }
    `;
  }

  render() {
    return html`<div id="slide-wrapper" class="slide-closed">
      <div id="layover" class="layover" @click="${this.close}"></div>
      <div
        id="slide-over"
        class="slide-over ${this.direction === 'right'
          ? 'slide-over-r'
          : 'slide-over-l'}"
      >
        <header class="slide-header">
          <h2 class="slide-header-text">${this.header}</h2>
          <button
            type="button"
            id="test-close"
            class="close-button"
            @click="${this.close}"
          >
            <svg
              style="width: 1.5rem; height: 1.5rem;"
              x-description="Heroicon name: outline/x"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </header>
        <main class="slide-content">
          <slot name="content">Content Here</slot>
        </main>
      </div>
    </div>`;
  }

  firstUpdated() {
    this.wrapper = this.shadowRoot.querySelector('#slide-wrapper');
    this.slideOver = this.shadowRoot.querySelector('#slide-over');
    this.slideOver.style.width = this.width;
    this.initialized = true;
  }

  close() {
    this.open = 'false';
  }

  toggleState() {
    if (!this.initialized) return;
    if (this.open === 'true') {
      this.wrapper.classList.remove('slide-closed');
      this.wrapper.classList.add('slide-open');
      this.initClickListeners();
    } else {
      this.wrapper.classList.remove('slide-open');
      this.wrapper.classList.add('slide-closed');
      this.removeEventListeners();
    }
  }

  // arrow function so that `this` will work when called
  // from document event listener
  handleKeyClick = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  initClickListeners() {
    document.addEventListener('keyup', this.handleKeyClick);
  }

  removeEventListeners() {
    document.removeEventListener('keyup', this.handleKeyClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'open') {
      this.toggleState();
    }
  }

  disconnectedCallback() {
    this.removeEventListeners();
    super.disconnectedCallback();
  }
}

export default SlideOver;
