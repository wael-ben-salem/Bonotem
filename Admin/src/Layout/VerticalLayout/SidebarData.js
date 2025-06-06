const SidebarData = [
    {
        label: "Menu",
        isMainMenu: true,
    },
    {
        label: "Dashboard",
        icon: "bx bx-line-chart-down",
        url: "/dashboard",

    },
    {
        label: "Personnel et Planning",
        style: { fontSize: "10px" },
        icon: "mdi mdi-calendar-outline",
        subItem: [
            { sublabel: "Type de Personnels", link: "/typepersonnel" },
            { sublabel: "Personnels", link: "/personnel" },
            { sublabel: "Planning", link: "/planning" },

            
        ],
    },
    {
        label: "Fournisseur",
        icon: "ri-table-2",
        url: "/Fournisseur",

        
    },
    

    
    {
            label: "Production",
            icon:   "bx bx-barcode",
            subItem: [
                { sublabel: "Ingrédients", link: "/ingredient" },
                { sublabel: "Packagings", link: "/packagings" },
                { sublabel: "Ingrédients Composés", link: "/ingredientCompose" },
                { sublabel: "Catégories", link: "/categorie" },

                   

            ],
        },
        {
            label: "Marchandise",
            icon: "ri-table-2",
            subItem: [
                { sublabel: "Ingrédients", link: "/marchandise-Ingredient" },
                { sublabel: "Packagings", link: "/marchandise-Packaging" },

                   

            ],
        },

  /*  {
        label: "Email",
        icon: "mdi mdi-email-outline",
        subItem: [
            { sublabel: "Inbox", link: "/inbox" },
            { sublabel: "Read Email", link: "/read-email" },
            { sublabel: "Email Compose", link: "/compose-email" },
        ],
    },*/

   /* {
        label: "Authentication",
        icon: "mdi mdi-account-circle-outline",
        subItem: [
            { sublabel: "Login", link: "/auth-login" },
            { sublabel: "Register", link: "/auth-register" },
            { sublabel: "Recover Password", link: "/auth-recoverpw" },
            { sublabel: "Lock Screen", link: "/auth-lock-screen" },
        ],
    },*/
    /*{
        label: "Utility",
        icon: "mdi mdi-format-page-break",
        subItem: [
            { sublabel: "Starter Page", link: "/pages-starter" },
            { sublabel: "Maintenance", link: "/pages-maintenance" },
            { sublabel: "Coming Soon", link: "/pages-comingsoon" },
            { sublabel: "Timeline", link: "/pages-timeline" },
            { sublabel: "FAQs", link: "/pages-faqs" },
            { sublabel: "Pricing", link: "/pages-pricing" },
            { sublabel: "Error 404", link: "/pages-404" },
            { sublabel: "Error 500", link: "/pages-500" },
        ],
    },
    {
        label: "Components",
        isMainMenu: true,
    },
   /* {
        label: "UI Elements",
        icon: "mdi mdi-briefcase-variant-outline",
        subItem: [
            { sublabel: "Alerts", link: "/ui-alerts" },
            { sublabel: "Badge", link: "/ui-badge" },
            { sublabel: "Breadcrumb", link: "/ui-breadcrumb" },
            { sublabel: "Buttons", link: "/ui-buttons" },
            { sublabel: "Cards", link: "/ui-cards" },
            { sublabel: "Carousel", link: "/ui-carousel" },
            { sublabel: "Dropdowns", link: "/ui-dropdowns" },
            { sublabel: "Grid", link: "/ui-grid" },
            { sublabel: "Images", link: "/ui-images" },
            { sublabel: "Lightbox", link: "/ui-lightbox" },
            { sublabel: "Modals", link: "/ui-modals" },
            { sublabel: "Offcanvas", link: "/ui-offcanvas" },
            { sublabel: "Range Slider", link: "/ui-rangeslider" },
            { sublabel: "Session Timeout", link: "/ui-sessiontimeout" },
            { sublabel: "Pagination", link: "/ui-pagination" },
            { sublabel: "Progress Bars", link: "/ui-progressbars" },
            { sublabel: "Placeholders", link: "/ui-placeholders" },
            { sublabel: "Tabs & Accordions", link: "/ui-tabs-accordions" },
            { sublabel: "Typography", link: "/ui-typography" },
            { sublabel: "Toasts", link: "/ui-toasts" },
            { sublabel: "Video", link: "/ui-video" },
            { sublabel: "Popovers & Tooltips", link: "/ui-popovers" },
            { sublabel: "Rating", link: "/ui-rating" },
        ],
    },*/

    {
        label: "Carte et Produit",
        icon:   "bx bx-barcode",
        subItem: [
           
            { sublabel: "Produits", link: "/produit" },
            { sublabel: "Cartes", link: "/carte" },
        ],
    },

     {
                label: "Vente",

                      icon: "fas fa-chart-line",
                      url: "/vente",

            },
    {
            label: "Dépense et Ventilation",
            icon: "ri-bar-chart-line",
            url:"/couts"
        },


        {
            label: "Perte",
            icon: "mdi mdi-briefcase-variant-outline",
            url: "/perte",

        },
        {
            label: "Charges",
            icon: "mdi mdi-currency-usd",
            subItem: [
            { sublabel: "Fixe", link: "/chargefixe" },

            { sublabel: "Variable", link: "/chargevariable" },
            ]   

        },
        {
            label: "Chiffre d'affaire",
            icon: "mdi mdi-currency-usd",
            url: "/chiffre",

        },


        
            
   /*{
        label: "Charts",
        icon: "ri-bar-chart-line",
        subItem: [
            { sublabel: "Apex Charts", link: "/chart-apexcharts" },
            { sublabel: "Apex Charts", link: "/chart-apexchartsa" },
            { sublabel: "Apex Charts", link: "/chart-apexchartsb" },
            { sublabel: "Apex Charts", link: "/chart-apexchartsc" },
            { sublabel: "Apex Charts", link: "/chart-apexchartsd" },
            { sublabel: "Apex Charts", link: "/chart-apexchartse" },
            { sublabel: "Apex Charts", link: "/chart-apexchartsf" },
            { sublabel: "Apex Charts", link: "/chart-apexchartsg" },
            { sublabel: "Apex Charts", link: "/chart-apexchartsh" },
            { sublabel: "Apex Charts", link: "/chart-apexchartsi" },
            { sublabel: "Apex Charts", link: "/chart-apexchartsj" },



            { sublabel: "Chartjs Charts", link: "/chart-chartjscharts" },
            { sublabel: "Re Charts", link: "/chart-floatcharts" },
            { sublabel: "Knob Charts", link: "/chart-jknobcharts" },
            { sublabel: "Sparkline Charts", link: "/chart-sparklinecharts" },
        ],
    },*/
    /*{
        label: "Icons",
        icon: "ri-brush-line",
        subItem: [
            { sublabel: "Box Icons", link: "/icon-boxicon" },
            { sublabel: "Material Design", link: "/icons-materialdesign" },
            { sublabel: "Dripicons", link: "/icon-dripicons" },
            { sublabel: "Font Awesome", link: "/icons-fontawesome" },
        ],
    },*/
    /*{
        label: "Maps",
        icon: "ri-map-pin-line",
        subItem: [
            { sublabel: "Google Maps", link: "/maps-google" },
            { sublabel: "Vector Maps", link: "/maps-vector" },
        ],
    },*/

]
export default SidebarData;