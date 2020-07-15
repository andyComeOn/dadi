import headlineIndex from "../pages/active/headline/headline_index.vue";
import staffIndex from "../pages/active/staff_marketing/staff_index.vue";
import sellTicket from "../pages/active/staff_marketing/sell_ticket.vue";
import payStaff from "../pages/active/staff_marketing/pay_staff.vue";
import trueGo from "../pages/active/know_true_go/know_true_go.vue";

let activeRoutes = [
    {
        path: "/headlineIndex",
        name: "headlineIndex",
        component: headlineIndex,
        meta: {
            title: "兑换",
        },
    },
    {
        path: "/staffIndex",
        name: "staffIndex",
        component: staffIndex,
        meta: {
            title: "秋果春季特惠",
        },
    },
    {
        path: "/sellTicket",
        name: "sellTicket",
        component: sellTicket,
        meta: {
            title: "秋果春季特惠",
        },
    },
    {
        path: "/payStaff",
        name: "/payStaff",
        component: payStaff,
        meta: {
            title: "支付",
        },
    },
    {
        path: "/trueGo",
        name: "/trueGo",
        component: trueGo,
        meta: {
            title: "了解秋果",
        },
    },
];

export default activeRoutes;
