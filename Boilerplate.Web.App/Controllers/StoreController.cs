using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class StoreController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult GetData()
        {
            using (TalentContext db = new TalentContext())
            {
                var data = db.Store.ToList();
                return Json(data);
            }
        }

        [HttpGet]
        public JsonResult CreateUpdate(Store store)
        {
            using (TalentContext db = new TalentContext())
            {
                if (store.Id == 0)
                {
                    db.Store.Add(store);
                    db.SaveChanges();
                }
                else
                {
                    var storeData = db.Store.Where(x => x.Id == store.Id).FirstOrDefault();
                    storeData.Name = store.Name;
                    storeData.Address = store.Address;
                    db.SaveChanges();
                }
                return Json(new
                {
                    redirectUrl = Url.Action("Index", "Store"),
                    isRedirect = true
                });
            }

        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            using (TalentContext db = new TalentContext())
            {
                var store = db.Store.Where(x => x.Id == id).FirstOrDefault();
                db.Store.Remove(store);
                db.SaveChanges();
            }
            return Json(new
            {
                redirectUrl = Url.Action("Index", "Store"),
                isRedirect = true
            });
        }
    }
}