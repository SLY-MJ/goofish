create database goofish;

use goofish;


-- 3) 用户表（普通用户 + 管理员）
CREATE TABLE users
(
    id             BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username       VARCHAR(50)            NOT NULL UNIQUE,
    email          VARCHAR(100) UNIQUE,
    phone          VARCHAR(20) UNIQUE,
    password_hash  VARCHAR(128)           NOT NULL,           -- 存加密后的密码（如 SHA-256/MD5+salt）
    salt           VARCHAR(64)            NOT NULL,           -- 盐值
    role           ENUM ('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    wallet_balance DECIMAL(12, 2)         NOT NULL DEFAULT 0.00,
    status         TINYINT                NOT NULL DEFAULT 1, -- 1正常 0禁用
    created_at     DATETIME               NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME               NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE INDEX idx_users_role ON users (role);
CREATE INDEX idx_users_status ON users (status);



-- 4) 商品表
CREATE TABLE items
(
    id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    seller_id   BIGINT UNSIGNED                       NOT NULL,
    title       VARCHAR(120)                          NOT NULL,
    description TEXT,
    price       DECIMAL(12, 2)                        NOT NULL,
    stock       INT                                   NOT NULL DEFAULT 1, -- 题目说可不做多数量，这里保留为1也可
    status      ENUM ('ON_SALE', 'SOLD', 'OFF_SHELF') NOT NULL DEFAULT 'ON_SALE',
    cover_image VARCHAR(255),
    view_count  INT                                   NOT NULL DEFAULT 0,
    is_deleted  TINYINT                               NOT NULL DEFAULT 0, -- 管理员删除违规商品可做软删除
    created_at  DATETIME                              NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME                              NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_items_seller
        FOREIGN KEY (seller_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE INDEX idx_items_seller_id ON items (seller_id);
CREATE INDEX idx_items_status ON items (status);
CREATE INDEX idx_items_price ON items (price);
CREATE INDEX idx_items_created_at ON items (created_at);
CREATE FULLTEXT INDEX ft_items_title_desc ON items (title, description);

-- 5) 商品图片表（可选多图）
CREATE TABLE item_images
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    item_id    BIGINT UNSIGNED NOT NULL,
    image_url  VARCHAR(255)    NOT NULL,
    sort_order INT             NOT NULL DEFAULT 0,
    created_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_item_images_item
        FOREIGN KEY (item_id) REFERENCES items (id)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE INDEX idx_item_images_item_id ON item_images (item_id);

-- 6) 关注关系（关注/取关卖家）
CREATE TABLE follows
(
    id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    follower_id BIGINT UNSIGNED NOT NULL,
    followee_id BIGINT UNSIGNED NOT NULL,
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_follows_follower
        FOREIGN KEY (follower_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_follows_followee
        FOREIGN KEY (followee_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_follows UNIQUE (follower_id, followee_id)
) ENGINE = InnoDB;


-- 7) 收藏关系（收藏/取消收藏商品）
CREATE TABLE favorites
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id    BIGINT UNSIGNED NOT NULL,
    item_id    BIGINT UNSIGNED NOT NULL,
    created_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_favorites_item
        FOREIGN KEY (item_id) REFERENCES items (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_favorites UNIQUE (user_id, item_id)
) ENGINE = InnoDB;

CREATE INDEX idx_favorites_item_id ON favorites (item_id);

-- 8) 评论表（不做楼中楼）
CREATE TABLE comments
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    item_id    BIGINT UNSIGNED NOT NULL,
    user_id    BIGINT UNSIGNED NOT NULL,
    comment    VARCHAR(500)    NOT NULL,
    is_deleted TINYINT         NOT NULL DEFAULT 0, -- 管理员删违规评论可软删
    created_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_item
        FOREIGN KEY (item_id) REFERENCES items (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE INDEX idx_comments_item_id ON comments (item_id);
CREATE INDEX idx_comments_user_id ON comments (user_id);
CREATE FULLTEXT INDEX ft_comments_content ON comments (comment);

-- 9) 评论点赞（进阶）
CREATE TABLE comment_likes
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    comment_id BIGINT UNSIGNED NOT NULL,
    user_id    BIGINT UNSIGNED NOT NULL,
    created_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_likes_comment
        FOREIGN KEY (comment_id) REFERENCES comments (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comment_likes_user
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_comment_likes UNIQUE (comment_id, user_id)
) ENGINE = InnoDB;

CREATE INDEX idx_comment_likes_user_id ON comment_likes (user_id);

-- 10) 标签（进阶）
CREATE TABLE tags
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50) NOT NULL UNIQUE,
    created_at DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE TABLE item_tags
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    item_id    BIGINT UNSIGNED NOT NULL,
    tag_id     BIGINT UNSIGNED NOT NULL,
    created_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_item_tags_item
        FOREIGN KEY (item_id) REFERENCES items (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_item_tags_tag
        FOREIGN KEY (tag_id) REFERENCES tags (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_item_tags UNIQUE (item_id, tag_id)
) ENGINE = InnoDB;

CREATE INDEX idx_item_tags_tag_id ON item_tags (tag_id);

-- 11) 订单（进阶：购买商品）
CREATE TABLE orders
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    buyer_id   BIGINT UNSIGNED                                   NOT NULL,
    seller_id  BIGINT UNSIGNED                                   NOT NULL,
    item_id    BIGINT UNSIGNED                                   NOT NULL,
    amount     DECIMAL(12, 2)                                    NOT NULL,
    status     ENUM ('CREATED', 'PAID', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'CREATED',
    created_at DATETIME                                          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    paid_at    DATETIME                                          NULL,
    CONSTRAINT fk_orders_buyer
        FOREIGN KEY (buyer_id) REFERENCES users (id)
            ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_orders_seller
        FOREIGN KEY (seller_id) REFERENCES users (id)
            ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_orders_item
        FOREIGN KEY (item_id) REFERENCES items (id)
            ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE INDEX idx_orders_buyer_id ON orders (buyer_id);
CREATE INDEX idx_orders_seller_id ON orders (seller_id);
CREATE INDEX idx_orders_item_id ON orders (item_id);
CREATE INDEX idx_orders_status ON orders (status);

-- 12) 钱包流水（进阶）
CREATE TABLE wallet_logs
(
    id            BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id       BIGINT UNSIGNED                                                        NOT NULL,
    change_amount DECIMAL(12, 2)                                                         NOT NULL, -- 正数入账，负数出账
    balance_after DECIMAL(12, 2)                                                         NOT NULL,
    business_type      ENUM ('RECHARGE', 'PURCHASE', 'SALE_INCOME', 'REFUND', 'ADMIN_ADJUST') NOT NULL,
    business_id        BIGINT UNSIGNED                                                        NULL,     -- 可关联订单ID等
    remark        VARCHAR(255),
    created_at    DATETIME                                                               NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_wallet_logs_user
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE INDEX idx_wallet_logs_user_id ON wallet_logs (user_id);
CREATE INDEX idx_wallet_logs_biz_type ON wallet_logs (business_type);


