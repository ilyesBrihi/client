import { useTranslation } from "react-i18next";
import MapComponent from "../Components/MapComponent";
import Select from "../Components/Select";
import SelectCom from "../Components/SelectCom";
import SelectYear from "../Components/SelectYear";
import { UploadIcon } from "../Svgs/Svgs";

const Sectiononetwo = ({ props }) => {
    const { t, i18n } = useTranslation();
    const {
        form,
        setForm

    } = props;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const profile = localStorage.getItem("profile-picture");

    return (
        <section>
            <h2 className="h2">{t("general")}</h2>
            <form
                method="post"
                className="bg-white mx-10 p-5 justify-items-center items-center rounded-2xl my-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            >
                <div className="relative w-[150px] h-[200px] rounded-lg md:self-center md:justify-self-center bg-slate-600 lg:row-span-5 lg:col-span-1 md:col-span-1 md:row-start-2 md:row-span-4 sm:col-span-2">
                    {(
                        <img
                            className="w-full h-full object-cover bg-center"
                            src={profile}
                            alt="Selected"
                        />
                    )}
                    {/*<input*/}
                    {/*  type="file"*/}
                    {/*  hidden*/}
                    {/*  accept="image/*"*/}
                    {/*  style={{ display: "none" }}*/}
                    {/*  onChange={handleFileChange}*/}
                    {/*  ref={fileInputRef}*/}
                    {/*/>*/}
                    {/*<button*/}
                    {/*  type="none"*/}
                    {/*  className="absolute bottom-[-12px] right-[-12px] rounded-full bg-primary text-white p-3 text-center"*/}
                    {/*  onClick={() => fileInputRef.current.click()}*/}
                    {/*>*/}
                    {/*  <UploadIcon />*/}
                    {/*</button>*/}
                </div>

                <input
                    type="text"
                    className="btn lg:col-span-2 md:col-span-1 sm:col-span-2"
                    name="fname"
                   
                    required
                    value={localStorage.getItem("last_name")}
                    disabled={true}
                    placeholder={t("fname")}
                />
                <input
                    type="text"
                    name="lname"
                    className="btn lg:col-span-2 md:col-span-2"
                    onChange={(e)=>setFirstName(e.target.value)}
                    required
                    value={localStorage.getItem("first_name")}
                    disabled={true}
                    placeholder={t("lname")}
                />
                <input
                    type="text"
                    name="address"
                    className="btn lg:col-span-2"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    required
                    placeholder={t("address")}
                />
                <Select props={{ wilaya, setWilaya, setWilayaselected }} />
                <SelectCom props={{ wilaya, setCommune,commune }} />
                <input
                    type="email"
                    className="btn lg:col-span-2"
                    placeholder={t("email")}
                    required
                    value={localStorage.getItem("email")}
                    disabled={true}
                    name="email"
                />
                <input
                    type="tel"
                    className={
                        i18n.language == "ar"
                            ? "btn lg:col-span-2 text-end"
                            : "btn lg:col-span-2 text-start"
                    }
                    placeholder={t("phone")}
                    value={phone}
                    onChange={(e)=>{setPhone(e.target.value)}}
                    required
                    name="phone"
                />
                <div></div>
                {/*<div className="sm:col-span-2 md:col-span-3 lg:col-span-5 border-solid border-primary border-[2px] rounded-xl">*/}
                {/*  <MapComponent props={{ position, setPosition }} />*/}
                {/*</div>*/}
            </form>
        </section>
    );
};

export default Sectiononetwo;
