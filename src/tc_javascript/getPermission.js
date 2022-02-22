const Permission = {
  getAll: async (HTTP_BASEURL, save_baseurl = false) => {
    if (save_baseurl) {
      localStorage.setItem('HTTP_BASEURL', HTTP_BASEURL);
      return;
    } else {
      function request() {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: `${HTTP_BASEURL}/core/index.php?route=apis/callout/permissionRequest`,
            method: 'GET',
            timeout: 0,
            data: {
              url: '/api/permissions/list/user-has-permission-list',
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            success(data) {
              resolve(JSON.parse(data));
            },
            error(err) {
              reject(err);
            },
          });
        });
      }

      try {
        const result = await request();
        return result;
      } catch (error) {
        return error;
      }
    }
  },

  getModule: async (prefix) => {
    const HTTP_BASEURL = localStorage.getItem('HTTP_BASEURL');
    function request() {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `${HTTP_BASEURL}/core/index.php?route=apis/callout/permissionRequest`,
          method: 'GET',
          timeout: 0,
          data: {
            url: `/api/permissions/list/user-has-permission-list?prefix=${prefix}`,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          success(data) {
            const result = JSON.parse(data);
            if (result.success) {
              resolve(result.data);
              console.log(`result data`, result.data);
            } else {
              resolve('it is not success to get permission list');
            }
          },
          error(err) {
            reject(err);
          },
        });
      });
    }

    try {
      const result = await request();
      return result;
    } catch (error) {
      return error;
    }
  },
};
