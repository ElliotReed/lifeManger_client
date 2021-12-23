import PropTypes from "prop-types";

import config from "config/config";

import MaxWidthContainer from "components/common/MaxWidthContainer";
import CurrentTime from "components/common/datetime/CurrentTime";
import FooterNav from "./FooterNav";
// import SocialLinks from '../common/SocialLinks';
import styles from "./footer.module.scss";

export default function Footer({ showWebAuthor = false }) {
  return (
    <footer className={styles.footer}>
      <MaxWidthContainer>
        <div className={styles.container}>
          {/* <SocialLinks /> */}
          <section className={styles.attribution}>
            <div>
              © {new Date().getFullYear()} by {config.siteTitle}
            </div>
            {showWebAuthor && (
              <div className={styles.webAuthor}>
                <cite>
                  Website by
                  <a href={config.authorLink}>{config.author}</a>
                </cite>
              </div>
            )}
          </section>
          <CurrentTime updateBy="minute" />
        </div>
        <FooterNav />
      </MaxWidthContainer>
    </footer>
  );
}

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};
