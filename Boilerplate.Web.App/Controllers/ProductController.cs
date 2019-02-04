using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;

namespace Boilerplate.Web.App.Controllers
{
    public class ProductController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }

        public JsonResult GetData()
        {
            using (TalentContext db = new TalentContext())
            {
                var data = db.Product.ToList();
                return Json(data);
            }
        }
        
        [HttpGet]
        public JsonResult CreateUpdate(Product product)
        {
            using (TalentContext db = new TalentContext())
            {
                if (product.Id == 0)
                {
                    db.Product.Add(product);
                    db.SaveChanges();
                }
                else
                {
                    var productData = db.Product.Where(x => x.Id == product.Id).FirstOrDefault();
                    productData.Name = product.Name;
                    productData.Price = product.Price;
                    db.SaveChanges();
                }
                return Json(new
                {
                    redirectUrl = Url.Action("Index", "Product"),
                    isRedirect = true
                });
            }

        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            using (TalentContext db = new TalentContext())
            {
                var data = db.Product.Where(x => x.Id == id).FirstOrDefault();
                db.Product.Remove(data);
                db.SaveChanges();
            }
            return Json(new
            {
                redirectUrl = Url.Action("Index", "Product"),
                isRedirect = true
            });
        }
    }
}