export class Menu {
  count;
  description;
  filter;
  items;
  name;
  parent;
  slug;
  taxonomy;
  term_group;
  term_id;
  term_taxonomy_id;

  constructor(dataFromAPI) {
    if (dataFromAPI) {
      Object.assign(this, dataFromAPI);
      this.items = this.getMenuItemsFromAPI(this.items);
    }
  }

  getMenuItemsFromAPI(menuItemsFromAPI) {
    const menuItems = [];

    menuItemsFromAPI.forEach((item) => {
      const menuItem = new MenuItem(item, menuItemsFromAPI);

      if (menuItem.menu_item_parent === '0') {
        menuItems.push(menuItem);
      }
    });

    return menuItems;
  }
};

export class MenuItem {
  ID;
  attr_title;
  classes;
  comment_count;
  comment_status;
  db_id;
  description;
  filter;
  guid;
  has_children; // Not in WP model
  items; // Not in WP model
  menu_item_parent;
  menu_order;
  object;
  object_id;
  ping_status;
  pinged;
  post_author;
  post_content;
  post_content_filtered;
  post_date;
  post_date_gmt;
  post_excerpt;
  post_mime_type;
  post_modified;
  post_modified_gmt;
  post_name;
  post_parent;
  post_password;
  post_status;
  post_title;
  post_type;
  target;
  title;
  to_ping;
  type;
  type_label;
  url;
  xfn;

  constructor(dataFromAPI, allMenuItemsFromAPI) {
    if (dataFromAPI) {
      Object.assign(this, dataFromAPI);

      if (allMenuItemsFromAPI) {
        this.items = this.getMenuItemChildren(this, allMenuItemsFromAPI);
        this.has_children = this.items.length > 0
      }
    }
  }

  getMenuItemChildren(menuItem, menuItemsFromAPI) {
    return menuItemsFromAPI
      .filter((item) => item.menu_item_parent == menuItem.ID)
      .map((item) => new MenuItem(item, menuItemsFromAPI));
  }
}