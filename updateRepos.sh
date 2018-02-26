#!/bin/bash

cecho() {
  local code="\033["
  case "$1" in
    black  | bk) color="${code}0;30m";;
    red    |  r) color="${code}1;31m";;
    green  |  g) color="${code}1;32m";;
    yellow |  y) color="${code}1;33m";;
    blue   |  b) color="${code}1;34m";;
    purple |  p) color="${code}1;35m";;
    cyan   |  c) color="${code}1;36m";;
    gray   | gr) color="${code}0;37m";;
    *) local text="$1"
  esac
  [ -z "$text" ] && local text="$color$2${code}0m"
  echo -e "$text"
}

declare -a updatedRepos=()

addUpdatedRepo(){
  updatedRepos=("${updatedRepos[@]}" "$1")
}

printUpdatedRepos(){
  if [ ${#updatedRepos[@]} -gt 0 ]; then
    cecho p "# ${#updatedRepos[@]} Updated repositories:"
    cecho p "# --------------------------------------"
    for repo in "${updatedRepos[@]}";
    do
      cecho p "# > ${repo}"
    done
    cecho p "# --------------------------------------"
  else
    cecho r "#  ------------------"
    cecho r "# | NOTHING UPDATED! |"
    cecho r "#  ------------------"
  fi


}

update(){
  clear
  dir=$1;
  cd $dir ;
  if [ -d .git ]; then
    cecho b "# UPDATING => $dir ";
    cecho c "fetching...";
    cecho c "$(git fetch)";
    cecho c "pulling";
    cecho c "$(git pull)";
    addUpdatedRepo ${dir}
    cecho b "\n"
  else
    cecho g "#### $PWD does not contains a git repository"
  fi
  cd .. ;
}

finish(){
  clear
  cecho g "########################################";
  cecho g "# DONE! ";
  printUpdatedRepos ${updatedRepos}
  cecho g "########################################";
  cecho g "\n"
}

clear
cecho b "\t\t---- Update all git proyects in a workspace folder ----"
if [ "$1" == "-a" ] || [ "$1" == "all" ]; then
  cecho p "\tALL GIT REPOS WILL BE UPDATED\n"
  for d in */ ; do
    update $d;
  done
  finish
elif [ "$1" == "-e" ] || [ "$1" == "each" ]; then
  for d in */ ; do
    cd $d
    isGit="0"
    if [ -d .git ]; then
      isGit="1"
    fi
    cd ..
    if [ "$isGit" == "1" ]; then
      cecho g "Do you want to update => $d  (yes/no)"
      read -p ">>> " res
      while [ "$res" != "yes" ] && [ "$res" != "no" ]; do
        cecho r "please write 'yes' or 'no'"
        read -p ">>> " res
      done
      if [ "$res" == "yes" ]; then
        update $d;
      else
      cecho r "$d Was NOT updated"
      fi
    fi
  done
  finish
else

  cecho g "Do you want to update your repos in folder  ${PWD} ? (yes/no)";
  read -p ">>> " resp
  while [ "$resp" != "yes" ] && [ "$resp" != "no" ]; do
    cecho r "please write 'yes' or 'no'"
    read -p ">>> " resp
  done

  if [ "$resp" == "yes" ]; then
    clear
    cecho g "Do you want to update all repositories or want to decide per folder?"
    cecho g "1) update all"
    cecho g "2) ask me for each one"
    read -p ">>> " op;
    opone="1";
    optwo="2"
    while [ "$op" != "$opone" ] && [ "$op" != "$optwo" ]; do
      cecho r "please choose a valid option"
      read -p ">>> " op;
    done
    if [ "$op" == "$opone" ]; then
      for d in */ ; do
        update $d;
      done
    finish;
    elif [ "$op" == "$optwo" ];then
      for d in */ ; do
        cecho g "Do you want to update => $d  (yes/no)"
        read -p ">>> " res
        while [ "$res" != "yes" ] && [ "$res" != "no" ]; do
          cecho r "please write 'yes' or 'no'"
          read -p ">>> " res
        done
        if [ "$res" == "yes" ]; then
          update $d;
        else
          cecho g "$d Was not updated"
        fi
      done
    finish
    fi
  elif [ "$resp" == "no" ]; then
    cecho p "Nothing updated"
  else
    cecho r "please write 'yes' or 'no'";
  fi
fi
