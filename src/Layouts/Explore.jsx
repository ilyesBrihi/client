import {useTranslation} from "react-i18next";
import {CoolPic} from "../Svgs/Svgs";
import {useEffect, useState} from "react";
import LawyerCard from "../Components/LawyerCard";
import {SearchIcon} from "../Svgs/Svgs";
import Select from "../Components/Select";
import {Link} from "react-router-dom";
import axios from 'axios'

const Explore = () => {
    const [wilaya, setWilaya] = useState();
    const [wilayaselected, setWilayaselected] = useState(false);
    const [category, setCategory] = useState();
    const [lang, setLang] = useState();
    const [years, setYears] = useState();
    const [rating, setRating] = useState();
    const [name, setName] = useState();
    const {t, i18n} = useTranslation();
    const [issearch, setIssearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [filtreddata, setFiltreddata] = useState([]);
    const [data, setData] = useState();
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8000/core/lawyer-profile-search/"
        }).then(
            (res) => {
                console.log(res.data)
                setData(res.data)
                setIsLoading(false)
            }
        )

    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        setIssearch(true);
        console.log(`${wilaya} ${category} ${lang} ${name}`)
        if(data){

        let filtered = data.search_results?.filter((lawyer) => {
            return lawyer.first_name.toLowerCase().includes(name.toLowerCase()) || lawyer.last_name.toLowerCase().includes(name.toLowerCase());

        });
        if (category) {
            filtered = filtered.filter((lawyer) => lawyer.bio == category);
        }
        if (lang) {
            filtered = filtered.filter((lawyer) => lawyer.language == lang);
        }
        if (wilaya) {
            filtered = filtered.filter((lawyer) => lawyer.address.state == wilaya);
        }
        console.log(filtered)
        setFiltreddata(filtered);
        }
    }

    return isLoading?(<div className={"flex mt-10 text-2xl font-bold justify-center text-white"}><p>Loading</p></div>):(
        <div className="h-full bg-primary">
            <p className="text-white font-bold uppercase text-lg text-center my-10">
                {t("explore")}
            </p>
            <div className="relative my-3 mx-[5%]">
                <input
                    type="text"
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    value={name}
                    name="search"
                    className="rounded-xl shadow-lg w-full py-2 ps-10 focus:outline-none border-none"
                    required
                    placeholder={t("find")}
                />
                <SearchIcon/>
            </div>
            <div className="mx-[5%] grid grid-cols-2 justify-items-center gap-1 md:grid-cols-6">
                <select onChange={(e) => {
                    setCategory(e.target.value)
                }} className="select" name="category">
                    <option value="" disabled selected hidden>
                        {t("cate")}
                    </option>
                    <option value={1}>{t("bank")}</option>
                    <option value={2}>{t("tax")}</option>
                    <option value={3}>{t("gpractice")}</option>
                </select>
                <select onChange={(e) => {
                    setLang(e.target.value)
                }} className="select" name="lang">
                    <option value="" disabled selected hidden>
                        {t("lang")}
                    </option>
                    <option value={1}>{t("ar")}</option>
                    <option value={2}>{t("eng")}</option>
                    <option value={3}>{t("fr")}</option>
                </select>
                <Select
                    props={{
                        wilaya,
                        setWilaya,
                        setWilayaselected,
                    }}
                />
                {/*<select onChange={(e) => {*/}
                {/*    setYears(e.target.value)*/}
                {/*}} className="select" name="years">*/}
                {/*    <option value="" disabled selected hidden>*/}
                {/*        {t("years")}*/}
                {/*    </option>*/}
                {/*    /!*{[...Array(50)].map((x, i) => (*!/*/}
                {/*    /!*    <option key={i} value={i}>{`${i} ${t("expyear")}`}</option>*!/*/}
                {/*    /!*))}*!/*/}
                {/*</select>*/}
                <select onChange={(e) => {
                    setRating(e.target.value)
                }} className="select" name="rating">
                    <option value="" disabled selected hidden>
                        {t("rating")}
                    </option>
                    {[...Array(6)].map((x, i) => (
                        <option key={i} value={i}>{`${i} ${t("stars")}`}</option>
                    ))}
                </select>
                <button onClick={(e) => {
                    handleSearch(e);
                    console.log(filtreddata)
                }}
                        className="bg-white text-primary text-base font-semibold w-full text-center rounded-lg transition duration-[0.5s] ease-in-out hover:bg-green-700 hover:text-white">{t("search")}</button>
            </div>
            <div className="w-full flex justify-center items-center">
                {issearch == true && filtreddata?.length > 0 ? (
                    <div className="w-[90%] mx-auto">
                        <h1 className="text-white text-xl font-bold my-3">
                            {t("searchresult")}
                        </h1>
                        {filtreddata?.map((lawyer) => (
                            <Link className="no-underline" to={`/lawyer/${lawyer.id}`}>
                                <LawyerCard
                                    key={lawyer.id}
                                    props={{
                                        id: lawyer.address.id,
                                        name: lawyer.first_name + " " + lawyer.last_name,
                                        address: lawyer.address.state,
                                        rating: lawyer.rating,
                                        categ: "category tbd",
                                        exp: lawyer.bio,
                                        langs: lawyer.language,
                                        img: lawyer.images[0],
                                    }}
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <CoolPic/>
                )}
            </div>
        </div>
    );
};

export default Explore;
