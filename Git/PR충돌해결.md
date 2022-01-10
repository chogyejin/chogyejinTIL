# Pull Request 할 때 conflict

- main에서 떼어낸 branch에서 작업하다가 push하여 create pull request를 하려고 할 때 main의 변경 사항 때문에 conflict가 일어날 수 있다.

### 해결방법

1. 로컬에서 main branch로 이동한다.<br>
   `git checkout main`
2. 로컬에 최신으로 업데이트된 origin의 내용을 pull한다.<br>
   `git pull origin main`
3. 충돌이 생겼던 나의 branch로 이동한다.<br>
   `git checkout mybranch`
4. main과 나의 branch를 merge한다.
   `git merge main`
5. 최신버전과 내 변경 사항의 충돌하고, 해당 파일에 들어가서 원하는 내용으로 수정한다.
6. `git add .` 후 staging 된 파일을 commit하고 `git push origin mybranch`로 푸시한다.
7. github에서 PR을 마무리한다.
