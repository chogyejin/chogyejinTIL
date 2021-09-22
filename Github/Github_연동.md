# Git - VSCode 연동

## 1. GitHub에서 Repository 생성

깃헙에서 default branch는 main이고 로컬 branch가 master라면 <br>`git config --global init.defaultBranch main`<br>
으로 설정 변경 가능(Git 2.28 이상)

## 2. VSCode에서 Initialize Repository 클릭

## 3. 로컬 저장소에 commit

## 4. 원격 저장소 지정

`git remote add origin URL.git`<br><br>
원격 저장소에 있는 내용을 먼저 반영해야 할 때는<br>
`git pull origin main --allow-unrelated-histories`<br>

## 5. 원격 저장소에 푸시

`git push -u origin main`

## 6. 로컬 저장소와 원격 저장소의 브랜치가 다를 경우

Compare & Pull Request > create pull request > main 브랜치에서 Merge pull request
