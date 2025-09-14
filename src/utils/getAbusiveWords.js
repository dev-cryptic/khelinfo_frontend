const getAbusiveWords = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/master/en"
  );
  const text = await res.text();
  return text.split("\n").map((w) => w.trim().toLowerCase());
};

export default getAbusiveWords;
