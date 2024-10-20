import React from "react";
import Icon from "@mdi/react";

import {
  mdiFoodApple,
  mdiCarrot,
  mdiCow,
  mdiFoodSteak,
  mdiFish,
  mdiBaguette,
  mdiCubeOutline,
  mdiChiliMedium,
  mdiBottleWine,
  mdiMuffin,
  mdiPopcorn,
  mdiSprayBottle,
  mdiBabyBottleOutline,
  mdiDogSide,
  mdiHome,
  mdiTelevisionClassic,
  mdiHanger,
  mdiMedicationOutline,
  mdiCowOff,
  mdiBarleyOff,
  mdiLeaf,
  mdiBarley,
  mdiFoodKosher,
  mdiShovel,
  mdiTools,
} from "@mdi/js";

const departmentLogo = (props) => {
  const departmentName = props.departmentName;
  const logoSize = props.logoSize || 1;
  const logoColor = props.logoColor || "#000";

  switch (departmentName) {
    case "Fruits":
      return <Icon path={mdiFoodApple} size={logoSize} color={logoColor} />;
    case "Vegetables":
      return <Icon path={mdiCarrot} size={logoSize} color={logoColor} />;
    case "Dairy":
      return <Icon path={mdiCow} size={logoSize} color={logoColor} />;
    case "Meat":
      return <Icon path={mdiFoodSteak} size={logoSize} color={logoColor} />;
    case "Fish":
      return <Icon path={mdiFish} size={logoSize} color={logoColor} />;
    case "Bakery":
      return <Icon path={mdiBaguette} size={logoSize} color={logoColor} />;
    case "Frozen":
      return <Icon path={mdiCubeOutline} size={logoSize} color={logoColor} />;
    case "Spices":
      return <Icon path={mdiChiliMedium} size={logoSize} color={logoColor} />;
    case "Drinks":
      return <Icon path={mdiBottleWine} size={logoSize} color={logoColor} />;
    case "Canned":
    // return <Icon path={mdiFoodApple} size={logoSize} color={logoColor} />
    case "Sweets":
      return <Icon path={mdiMuffin} size={logoSize} color={logoColor} />;
    case "Snacks":
      return <Icon path={mdiPopcorn} size={logoSize} color={logoColor} />;
    case "Cleaning":
    return <Icon path={mdiSprayBottle} size={logoSize} color={logoColor} />
    case "Personal Care":
    // return <Icon path={mdiFoodApple} size={logoSize} color={logoColor} />
    case "Baby":
      return (
        <Icon path={mdiBabyBottleOutline} size={logoSize} color={logoColor} />
      );
    case "Pets":
      return <Icon path={mdiDogSide} size={logoSize} color={logoColor} />;
    case "Home":
      return <Icon path={mdiHome} size={logoSize} color={logoColor} />;
    case "Electronics":
    return <Icon path={mdiTelevisionClassic} size={logoSize} color={logoColor} />
    case "Stationery":
    // return <Icon path={mdiFoodApple} size={logoSize} color={logoColor} />
    case "Clothing":
      return <Icon path={mdiHanger} size={logoSize} color={logoColor} />;
    case "Farmacy":
    return <Icon path={mdiMedicationOutline} size={logoSize} color={logoColor} />
    case "Supplements":
    // return <Icon path={mdiFoodApple} size={logoSize} color={logoColor} />
    case "Meat substitutes":
    return <Icon path={mdiCowOff} size={logoSize} color={logoColor} />
    case "Gluten free":
    return <Icon path={mdiBarleyOff} size={logoSize} color={logoColor} />
    case "Vegan":
      return <Icon path={mdiLeaf} size={logoSize} color={logoColor} />;
    case "Organic":
      return <Icon path={mdiBarley} size={logoSize} color={logoColor} />;
    case "Kosher":
      return <Icon path={mdiFoodKosher} size={logoSize} color={logoColor} />;
    case "Garden":
    return <Icon path={mdiShovel} size={logoSize} color={logoColor} />
    case "Tools":
      return <Icon path={mdiTools} size={logoSize} color={logoColor} />;
    default:
      return null;
  }
};
