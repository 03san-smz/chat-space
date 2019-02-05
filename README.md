# DB設計

## users table

|Column|Type|Options|
|------|----|-------|
|name|text|null: false, unique: true|
|mail|string|null: false|

### Association
- has_many :groups
- has_many :messeges
- has_many :members

## groups table

|Column|Type|Options|
|------|----|-------|
|name|text|null: false, unique: true|

### Association
- belongs_to :user
- has_many :messeges

## members table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messages table

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
