import RatingComponent from "./RatingComponent";

const LawyerCard = ({ props }) => {
  const { id, name, address, rating, categ, exp, langs, img } = props;
  return (
    <div className="w-[100%] h-60 bg-white rounded-2xl my-2 flex justify-start items-center">
      <div className="w-40 h-full bg-slate-500 rounded-s-2xl"></div>
      <div className="p-2">
        <h1 className="text-xl text-primary font-semibold">{name}</h1>
        <p>{address}</p>
        <RatingComponent rating={rating} />
        <p>{categ}</p>
        <p>{exp}</p>
        <p>{langs}</p>
      </div>
    </div>
  );
};

export default LawyerCard;
