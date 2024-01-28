import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer
      className={
        i18n.language == "ar"
          ? "bg-[#1D1D21] p-10 text-center sm:text-start"
          : "bg-[#1D1D21] p-10 text-center sm:text-end"
      }
    >
      <ul className="flex items-center gap-3 mb-3 mt-1">
        <li className="list-none">
          <Link className="text-white text-sm underline">{t("privacy")}</Link>
        </li>
        <li className="list-none">
          <Link className="text-white underline text-sm">{t("uset")}</Link>
        </li>
        <li className="list-none">
          <Link className="text-white text-sm underline">{t("community")}</Link>
        </li>
        <li className="list-none">
          <Link className="text-white text-sm underline">{t("sitemap")}</Link>
        </li>
      </ul>
      <p className="txt text-end">{t("rights")}</p>
    </footer>
  );
};

export default Footer;
