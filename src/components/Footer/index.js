function Footer() {
  return (
    <footer className="footer">
      <h5 className="footer-h5">
        Desenvolvido por{" "}
        <a
          href="https://vitorhumoreira.github.io/"
          target="_blank"
          rel="noreferrer"
          className="footer-portfolio"
        >
          Vitor Hugo
        </a>{" "}
        - 2022.
      </h5>

      <ul className="footer-icons">
        <li className="icon github">
          <span className="tooltip">GitHub</span>
          <a
            href="https://github.com/VitorHUMoreira"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li className="icon linkedin">
          <span className="tooltip">LinkedIn</span>
          <a
            href="https://www.linkedin.com/in/vitor-hugo-ulson-moreira/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
        <li className="icon slideshow">
          <span className="tooltip">Slideshow</span>
          <a
            href="https://www.canva.com/design/DAFMUYCOY2k/UFHDXeGt0-2oqubJGZevEg/view?utm_content=DAFMUYCOY2k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-solid fa-person-chalkboard"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;