#  Git チーム学習リポジトリ

2~3人チームで **ブランチ・コンフリクト・PR・rebase** を実践的に習得するための学習用リポジトリです.

---

##  ファイル構成

```
git-learning/
+-- index.html       # メインページ（コンフリクト練習の中心）
+-- css/
|   +-- style.css    # スタイル（複数人で編集してコンフリクトを体験）
+-- js/
|   +-- main.js      # JavaScript（機能追加の練習）
+-- README.md        # このファイル
```

---

##  役割分担（推奨）

| 役割 | 担当 | メインタスク |
|------|------|------------|
| リーダー (A) | リポジトリ管理・PRレビュー | mainブランチの保護・マージ判断 |
| メンバー B | メンバーカード追加・機能実装 | コンフリクト解消の練習 |
| メンバー C | ログ追加・JS機能追加 | rebase / merge の使い分け体験 |

---

##  学習ステップ

### STEP 1｜準備（全員で実施）

```bash
# リポジトリをクローン
git clone https://github.com/[ユーザー名]/git-learning.git
cd git-learning

# 自分の名前を設定（まだの場合）
git config user.name "自分の名前"
git config user.email "メールアドレス"
```

---

### STEP 2｜ブランチ作成・切り替え

各メンバーが自分のブランチを作成して作業します.

```bash
# メンバーBの場合
git checkout -b feature/member-B

# メンバーCの場合
git checkout -b feature/member-C
```

** タスク：** `index.html` の"メンバー紹介"セクションに自分のカードを追加する

```html
<!-- 自分のカードをコピーして編集 -->
<div class="card">
  <div class="card-avatar">B</div>
  <h3>メンバーB</h3>
  <p class="role">フロントエンド担当</p>
  <p class="bio">自己紹介を書こう</p>
  <div class="skills-tags">
    <span>CSS</span><span>JavaScript</span>
  </div>
</div>
```

```bash
git add index.html
git commit -m "feat: メンバーBのカードを追加"
git push origin feature/member-B
```

---

### STEP 3｜プルリクエスト（PR）・レビュー

1. GitHub上で `feature/member-B -> main` のPRを作成
2. **リーダー(A)がレビュー**してコメントを入れる
3. メンバーBが修正してコミットを追加
4. 承認されたらマージ

**[tip] レビューで確認すること：**
- コードに typo はないか？
- 他のカードと書き方が統一されているか？
- コメントの内容は適切か？

---

### STEP 4｜コンフリクトを意図的に発生させる！

これが一番の練習です.BとCが**同じ行を同時に編集**してコンフリクトを起こします.

**手順：**

```bash
# メンバーBのブランチで作業
git checkout feature/member-B
# index.html の<title>タグを"Git学習 | チームB"に変更してコミット

# メンバーCのブランチで同じ行を編集
git checkout feature/member-C
# index.html の<title>タグを"Git練習 | チームC"に変更してコミット
```

**Bのブランチをmainにマージ後,Cのブランチをmainにマージしようとするとコンフリクト発生！**

```bash
git checkout main
git pull origin main
git merge feature/member-C
# [!] CONFLICT (content): Merge conflict in index.html
```

**コンフリクトの解消方法：**

```html
<<<<<<< HEAD (main)
  <title>Git学習 | チームB</title>
=======
  <title>Git練習 | チームC</title>
>>>>>>> feature/member-C
```

->  話し合って1つに決める

```html
  <title>Git学習 | チームで習得</title>
```

```bash
git add index.html
git commit -m "fix: タイトルのコンフリクトを解消"
```

---

### STEP 5｜rebase と merge の違いを体験

**merge（履歴が残る）**
```bash
git checkout main
git merge feature/member-B
# -> マージコミットが作られる
# -> "Merge branch 'feature/member-B'"というコミットが追加される
```

**rebase（きれいな直線履歴）**
```bash
git checkout feature/member-C
git rebase main
# -> feature/member-CのコミットがmainのHEADの後ろに"移植"される
# -> 履歴が一直線になる
```

** ログで違いを確認：**
```bash
git log --oneline --graph --all
```

**使い分けの目安：**
| 状況 | 推奨 |
|------|------|
| チームの共有ブランチ | `merge`（履歴を保持） |
| 自分の作業ブランチ整理 | `rebase`（きれいな履歴） |
| mainへの取り込み | チームのルールに従う |

---

### STEP 6｜ブランチ保護ルールを設定（リーダーが実施）

GitHubの `Settings -> Branches -> Branch protection rules` で：

- - Require a pull request before merging
- - Require approvals: 1
- - Require status checks to pass before merging

これで**直接mainにpushできない**環境が完成！

---

##  練習チェックリスト

### ブランチ
- [ ] `git checkout -b` でブランチを作成できた
- [ ] `git branch -a` で全ブランチを確認できた
- [ ] 不要なブランチを `git branch -d` で削除できた

### コンフリクト解消
- [ ] コンフリクトが発生したファイルを特定できた
- [ ] `<<<<<<<` `=======` `>>>>>>>` マーカーの意味がわかった
- [ ] コンフリクトを解消してコミットできた

### プルリクエスト
- [ ] GitHubでPRを作成できた
- [ ] レビューコメントを入れた / 対応した
- [ ] PRをマージできた

### rebase / merge
- [ ] `git log --graph` で履歴の違いを確認できた
- [ ] rebase後に `git push --force-with-lease` が必要な理由を理解した

---

##  よくあるトラブル

**Q: pushが拒否された**
```bash
git pull --rebase origin main  # リモートの変更を取り込んでから再push
git push origin feature/自分のブランチ
```

**Q: 間違えてmainで作業してしまった**
```bash
git stash                           # 変更を退避
git checkout -b feature/救出ブランチ  # 新しいブランチを作成
git stash pop                       # 変更を戻す
```

**Q: コミットメッセージを間違えた（まだpushしていない場合）**
```bash
git commit --amend -m "正しいメッセージ"
```

---

##  コミットメッセージの規約

```
feat:     新機能追加
fix:      バグ修正
style:    デザイン変更
docs:     ドキュメント更新
refactor: リファクタリング
```

例: `feat: メンバーCのカードを追加`

---

Happy Coding! 
