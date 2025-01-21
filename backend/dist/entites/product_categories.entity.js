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
exports.ProductCateogryEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductCateogryEntity = class ProductCateogryEntity {
};
exports.ProductCateogryEntity = ProductCateogryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductCateogryEntity.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], ProductCateogryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], ProductCateogryEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductCateogryEntity, (category) => category.children, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", ProductCateogryEntity)
], ProductCateogryEntity.prototype, "parent_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductCateogryEntity, (category) => category.parent_id),
    __metadata("design:type", Array)
], ProductCateogryEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (category) => category.product_category),
    __metadata("design:type", Array)
], ProductCateogryEntity.prototype, "product_category", void 0);
exports.ProductCateogryEntity = ProductCateogryEntity = __decorate([
    (0, typeorm_1.Entity)('product_categories')
], ProductCateogryEntity);
//# sourceMappingURL=product_categories.entity.js.map