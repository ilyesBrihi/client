import { useTranslation } from "react-i18next";
import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
const LawyerProfile = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  return (
    <div className="p-7">
      <div className="bg-gray-300 w-fit p-1 rounded">
        <ul className="flex justify-start gap-0 sm:gap-5">
          <li>
            <Link
              to={`/lawyer/${id}`}
              className="link focus:bg-white focus:text-black"
            >
              {t("generale")}
            </Link>
          </li>
          <li>
            <NavLink to={`/lawyer/${id}/details`} className="link">
              {t("details")}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/lawyer/${id}/schedule`} className="link">
              {t("schedule")}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/lawyer/${id}/rating`} className="link">
              {t("rating")}
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default LawyerProfile;
