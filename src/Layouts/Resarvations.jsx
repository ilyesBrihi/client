import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet } from "react-router-dom";
const Reservations = () => {
  const [t, i18n] = useTranslation();
  return (
    <div>
      <div className="p-7">
        <div className="bg-gray-300 w-fit p-1 rounded">
          <ul className="flex justify-start gap-0 sm:gap-5">
            <li>
              <Link
                to={`/reservations`}
                className="link focus:bg-white focus:text-black"
              >
                {t("reservations")}
              </Link>
            </li>
            <li>
              <NavLink to={`/reservations/dates`} className="link">
                {t("rendez-vous")}
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Reservations;
