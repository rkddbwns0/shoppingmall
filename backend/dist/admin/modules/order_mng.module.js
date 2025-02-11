"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMngModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../../entites/admin.entity");
const order_entity_1 = require("../../entites/order.entity");
const order_mng_controller_1 = require("../controller/order_mng.controller");
const order_mng_service_1 = require("../services/order_mng.service");
let OrderMngModule = class OrderMngModule {
};
exports.OrderMngModule = OrderMngModule;
exports.OrderMngModule = OrderMngModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_entity_1.AdminEntity, order_entity_1.OrderEntity])],
        controllers: [order_mng_controller_1.OrderMngController],
        providers: [order_mng_service_1.OrderMngService],
    })
], OrderMngModule);
//# sourceMappingURL=order_mng.module.js.map