const fs = require('fs');
const path = require('path');

const profilePath = path.join(__dirname, 'src', 'pages', 'Profile.jsx');
let profileContent = fs.readFileSync(profilePath, 'utf8');
profileContent = profileContent.replace(
  /onClick: \(\) => navigate\("\/edit-shop"\),/g,
  'onClick: () => navigate("/shop-list"),'
);
fs.writeFileSync(profilePath, profileContent);

const editShopPath = path.join(__dirname, 'src', 'pages', 'EditShop.jsx');
let editShopContent = fs.readFileSync(editShopPath, 'utf8');

if (!editShopContent.includes('const location = useLocation();')) {
  editShopContent = editShopContent.replace(
    'const navigate = useNavigate();',
    'const navigate = useNavigate();\n  const location = useLocation();\n  const shopFromState = location.state?.shopData;'
  );
  editShopContent = editShopContent.replace(
    /useNavigate(.*)\} from "react-router-dom";/,
    'useNavigate, useLocation$1} from "react-router-dom";'
  );
}

const loadShopReplacement = `
  const loadShop = async () => {
    try {
      setLoading(true);
      if (shopFromState) {
        populateShopData(shopFromState);
        setViewState("edit");
      } else {
        const res = await fetchShop();
        if (res.status === 200 && res.data) {
          let d = res.data;
          if (Array.isArray(d)) {
            if (d.length > 0) d = d[0];
            else {
              setViewState("empty");
              setLoading(false);
              return;
            }
          }
          populateShopData(d);
          setViewState("edit");
        } else {
          setViewState("empty");
        }
      }
    } catch (error) {
      console.error("Error loading shop:", error);
      setViewState("empty");
    } finally {
      setLoading(false);
    }
  };

  const populateShopData = (d) => {
    setShopId(d.id);
    const currentShopImage = d.shopImage ? d.shopImage : null;
    const currentGallery = [
      d.image1 ? d.image1 : null,
      d.image2 ? d.image2 : null,
      d.image3 ? d.image3 : null,
      d.image4 ? d.image4 : null,
    ];
    setShopData({
      name: d.shopName || "",
      category: d.category || "",
      location: d.address || "",
      lat: d.lat || "",
      long: d.long || "",
      description: d.description || "",
      whatsapp: d.whatsappNumber || "",
      contact: d.shopNumber || "",
      registerNumber: d.registerNumber || "",
      openTime: parseTo24Hour(d.openTime) || "",
      closeTime: parseTo24Hour(d.closeTime) || "",
      website: d.website || "",
      shopImage: null,
      shopImageUrl: currentShopImage,
      gallery: [null, null, null, null],
      galleryUrls: currentGallery,
    });
    setMapSearch(d.address || "");
  };
`;

editShopContent = editShopContent.replace(/const loadShop = async \(\) => \{[\s\S]*?finally \{\s*setLoading\(false\);\s*\}\s*\};/m, loadShopReplacement.trim());

fs.writeFileSync(editShopPath, editShopContent);
