module.exports = {
  // Formats date to display correctly when passed into handlebars
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};
