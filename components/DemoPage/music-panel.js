

import style from "./demo-page.module.scss";
export default function MusicPanel() {
  return (
    <section>
     
      <div className={`${style.mdf__music__panel} mb-3`}>
        <div className={style.mdf__left_content}>
          <h6 className="text-orange">Promotional Text detection</h6>
          <p className="mb-0">8845 frames</p>
        </div>
        <div className={`${style.mdf__right_content} flex-fill`}>
          <ul className="d-flex justify-content-around mb-0 flex-row mt-1 list-unstyled">
            <li>Test.mp4</li>
            <li>mp4</li>
            <li>HD</li>
            <li>77sec</li>
          </ul>
        </div>
      </div>
      <div className="mdf__music__panel mb-3">
        <div className="mdf__left_content">
          <h6 className="text-orange">Promotional Text detection</h6>
          <p className="mb-0">8845 frames</p>
        </div>
        <div className={`${style.mdf__right_content} flex-fill`}>
          <ul className="d-flex justify-content-around mb-0 flex-row mt-1 list-unstyled">
            <li>Test.mp4</li>
            <li>mp4</li>
            <li>HD</li>
            <li>77sec</li>
          </ul>
        </div>
      </div>
      <div className="mdf__music__panel mb-3">
        <div className="mdf__left_content">
          <h6 className="text-orange">Promotional Text detection</h6>
          <p className="mb-0">8845 frames</p>
        </div>
        <div className={`${style.mdf__right_content} flex-fill`}>
          <ul className="d-flex justify-content-around mb-0 flex-row mt-1 list-unstyled">
            <li>Test.mp4</li>
            <li>mp4</li>
            <li>HD</li>
            <li>77sec</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
