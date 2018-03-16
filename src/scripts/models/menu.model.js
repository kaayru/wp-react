export class Menu {
  count: number;
  description: string;
  filter: string;
  items: Array<MenuItem>;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  term_group: number;
  term_id: number;
  term_taxonomy_id: number;

  constructor(dataFromAPI: Menu) {
    if (dataFromAPI) {
      Object.assign(this, dataFromAPI);
      this.items = this.getMenuItemsFromAPI(this.items);
    }
  }

  getMenuItemsFromAPI(menuItemsFromAPI: Array<MenuItem>): Array<MenuItem> {
    const menuItems: Array<MenuItem> = [];

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
  ID: number;
  attr_title: string;
  classes: Array<string>;
  comment_count: string;
  comment_status: string;
  db_id: number;
  description: string;
  filter: string;
  guid: string;
  has_children: boolean; // Not in WP model
  items: Array<MenuItem>; // Not in WP model
  menu_item_parent: string;
  menu_order: number;
  object: string;
  object_id: string;
  ping_status: string;
  pinged: string;
  post_author: string;
  post_content: string;
  post_content_filtered: string;
  post_date: string;
  post_date_gmt: string;
  post_excerpt: string;
  post_mime_type: string;
  post_modified: string;
  post_modified_gmt: string;
  post_name: string;
  post_parent: number;
  post_password: string;
  post_status: string;
  post_title: string;
  post_type: string;
  target: string;
  title: string;
  to_ping: string;
  type: string;
  type_label: string;
  url: string;
  xfn: string;

  constructor(dataFromAPI: MenuItem, allMenuItemsFromAPI: Array<MenuItem>) {
    if (dataFromAPI) {
      Object.assign(this, dataFromAPI);

      if (allMenuItemsFromAPI) {
        this.items = this.getMenuItemChildren(this, allMenuItemsFromAPI);
        this.has_children = this.items.length > 0
      }
    }
  }

  getMenuItemChildren(menuItem, menuItemsFromAPI): Array<MenuItem> {
    return menuItemsFromAPI
      .filter((item) => item.menu_item_parent == menuItem.ID)
      .map((item) => new MenuItem(item, menuItemsFromAPI));
  }
}