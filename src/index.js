import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('slide-over')
class SlideOver extends LitElement {
  @property({ type: String, reflect: true })
  open = 'false';

  initialized = false;

  that = this;

  static get styles() {
    return css`
      .slide-open {
        --layover-opacity: 0.75;
        --translate: 0;
      }

      .slide-closed {
        --layover-opacity: 0;
        --translate: 100%;
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
        background-color: rgba(107, 114, 128, 0.75);
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
        right: 0;
        width: 500px;
        background: #fff;
        z-index: 99999;
        height: 100%;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        transform: translateX(var(--translate));
        transition: transform 0.35s ease-in-out;
      }
    `;
  }

  render() {
    return html`<div id="slide-wrapper" class="slide-closed">
      <div id="layover" class="layover" @click="${this.close}"></div>
      <div class="slide-over">
        <div>
          <h1>test</h1>
          <button type="button" id="test-close" @click="${this.close}">
            close
          </button>
        </div>
      </div>
    </div>`;
  }

  firstUpdated() {
    this.wrapper = this.shadowRoot.querySelector('#slide-wrapper');
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
