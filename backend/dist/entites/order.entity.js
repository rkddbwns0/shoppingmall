"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const product_entity_1 = require("./product.entity");
const address_entity_1 = require("./address.entity");
const orderItem_entity_1 = require("./orderItem.entity");
let OrderEntity = class OrderEntity {
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "order_no", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.ProductEntity, (product) => product.order),
    (0, typeorm_1.JoinTable)({
        name: 'order_product_no',
        joinColumn: {
            name: 'order_no',
            referencedColumnName: 'order_no',
        },
        inverseJoinColumn: {
            name: 'product_no',
            referencedColumnName: 'product_id',
        },
    }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1, nullable: false }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['주문 완료', '배송 중', '배송 완료', '환불 진행 중', '환불 완료'],
        default: '주문 완료',
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "order_state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "refund_reason", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.AddressEntity, (address) => address.address_no),
    (0, typeorm_1.JoinColumn)({ name: 'address_no' }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "address_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], OrderEntity.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "order_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItemEntity, (orderItem) => orderItem.order_no),
    __metadata("design:type", Array)
], OrderEntity.prototype, "orderItem", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)('order')
], OrderEntity);
//# sourceMappingURL=order.entity.js.map